import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types';
const { Op } = require('sequelize');
const db = require('../models/');

export const getUsers = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const users = await db.users.findAll({
      raw: true,
      attributes: {
        include: [
          [db.Sequelize.col('user_type.type'), 'userType'],
          [db.Sequelize.col('user_role.role'), 'userRole'],
        ],
        exclude: ['password', 'typeId'],
      },
      include: [
        { model: db.userTypes, attributes: [] },
        { model: db.userRoles, attributes: [] },
      ],
    });

    for (const user of users) {
      user.name = user.firstName + ' ' + user.lastName;
    }

    res.json({ data: users });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userID } = req.body;

  try {
    const user = await db.users.findOne({
      where: {
        id: userID,
      },
    });

    res.json({ data: user, message: 'User found' });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, contractStartDate, contractEndDate, userType, userRole } = req.body;
  let formattedStartDate;
  let formattedEndDate;

  // TODO: iso date formatting improvements

  if (contractStartDate) {
    formattedStartDate = new Date(contractStartDate);
    formattedStartDate = formattedStartDate.toISOString().split('T')[0] + ' ' + formattedStartDate.toTimeString().split(' ')[0];
  }

  if (contractEndDate) {
    formattedEndDate = new Date(contractEndDate);
    formattedEndDate = formattedEndDate.toISOString().split('T')[0] + ' ' + formattedEndDate.toTimeString().split(' ')[0];
  }

  try {
    const updatedUser = await db.users.update(
      { firstName, lastName, email, contractStartDate, contractEndDate, userType, userRole },
      {
        where: {
          email: email,
        },
      }
    );

    return res.json({ data: updatedUser, message: 'User updated succesfully' });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { userID } = req.body;

  try {
    const users = await db.users.destroy({
      where: {
        id: userID,
      },
    });

    res.json({ message: 'User deleted succesfully' });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const getUserTypes = async (req: Request, res: Response) => {
  try {
    const userTypes = await db.userTypes.findAll();

    res.json({ data: userTypes });
  } catch (err) {
    res.json(err.name);
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  try {
    const userRoles = await db.userRoles.findAll();

    res.json({ data: userRoles });
  } catch (err) {
    res.json(err.name);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const user = await db.users.findByPk(userId, {
      attributes: {
        include: [
          [db.Sequelize.col('user_type.type'), 'userType'],
          [db.Sequelize.col('user_role.role'), 'userRole'],
        ],
        exclude: ['password', 'typeId'],
      },
      include: [
        { model: db.userTypes, attributes: [] },
        { model: db.userRoles, attributes: [] },
      ],
    });

    const userProjects = await user.getProjects({
      joinTableAttributes: [],
      attributes: {
        include: [
          [db.Sequelize.col('project_type.type'), 'projectType'],
        ],
      },
      include: [
        { model: db.projectTypes, attributes: [] },
        {
          model: db.clients,
          include: [
            { 
              model: db.countries,
            }
          ]
        },
      ],
    });

    res.json({ data: { ...user.toJSON(), projects: userProjects }, message: '' });
  } catch (err) {
    res.json({ message: err.name });
  }
}

// TODO: check if params handling is a good approach in this case
export const getUserWorkLogs = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const monthId = req.params.monthId;

  const startDate = new Date(2023, Number(monthId) - 1, 1);
  const endDate = new Date(2023, Number(monthId), 0);

  try {
    const workLogs = await db.workLogs.findAll({
      where: {
        userId: userId,
        date: {
          [Op.between]: [startDate, endDate],
        }
      },
      attributes: {
        exclude: ['projectId']
      },
      include: [
        { model: db.projects }
      ]
    });

    res.json({ data: workLogs, message: '' });
  } catch (err) {
    console.log(err);
    res.json({ message: err.name });
  }
}

// export const getUserProjects = async (req: Request, res: Response) => {
//     const userId = req.params.id;

//     try {
//         const user = await User.findByPk(userId);

//         if (!user) {
//         res.status(404).send('User not found');
//         return;
//         }

//         const groups = await user.getGroups({
//         through: false
//         });
//         res.json(groups);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while fetching groups for the user');
//     }
// }