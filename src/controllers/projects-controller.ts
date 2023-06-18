import { Request, Response } from 'express';
const db = require('../models/');

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await db.projects.findAll({
      include: [
        {
          model: db.clients,
        },
        {
          model: db.projectTypes,
        }
      ],
      attributes: {
        exclude: ['clientId'],
        include: [
          [db.Sequelize.col('project_type.type'), 'projectType'],
        ]
      }
    });
    res.json({ data: projects });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const addProject = async (req: Request, res: Response) => {
  const { name, projectType, clientId } = req.body;

  try {
    const newProject = await db.projects.create({
      name,
      projectType,
      clientId
    });

    return res.json({ projectData: newProject, message: `Project ${name} added` });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { name, projectType, clientId } = req.body;

  try {
    const updatedProject = await db.projects.update(
      {
        name,
        projectType,
        clientId
      },
      {
        where: {
          id: projectId
        }
      }
    );

    return res.json({ projectData: updatedProject, message: `Project ${name} updated` });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const removeProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    await db.projects.destroy({
      where: {
        id: projectId,
      },
    });

    res.json({ message: 'Project deleted succesfully' });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const getProjectTypes = async (req: Request, res: Response) => {
  try {
    const projectTypes = await db.projectTypes.findAll();
    res.json({ data: projectTypes });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const addUserToProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.body;

  try {
    const user = await db.users.findByPk(userId);
    const project = await db.projects.findByPk(projectId);

    if (!user || !project) {
      return res.status(404).json({ message: 'User or project not found' });
    }

    // TODO: rename project users db table
    const [userProject, created] = await db.project_users.findOrCreate({
      where: { userId, projectId }
    });

    if (!created) {
      return res.status(409).json({ message: 'User is already assign to the project!' });
    }

    return res.json({ message: 'User assigned succesfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const removeUserFormProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.params;

  try {
    const user = await db.users.findByPk(userId);
    const project = await db.projects.findByPk(projectId);

    if (!user || !project) {
      return res.status(404).json({ message: 'User or project not found' });
    }

    const deletedRows = await db.project_users.destroy({
      where: { userId, projectId }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'User project not found' });
    }

    return res.json({ message: 'User project deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getProjectDetails = async (req: Request, res: Response) => {
  const { projectId } = req.query;

  try {
    const project = await db.projects.findByPk(projectId, {
      include: [
        {
          model: db.clients,
          include: [
            {
              model: db.countries
            }
          ]
        },
        {
          model: db.projectTypes
        }
      ],
      attributes: {
        exclude: ['projectType', 'clientId']
      }
    });

    const projectUsers = await project.getUsers({
      joinTableAttributes: [],
      attributes: {
        include: [
          [db.Sequelize.col('user_role.role'), 'userRole'],
        ],
        exclude: ['password', 'userType']
      },
      include: [
        { model: db.userRoles, attributes: [] },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json({ data: { ...project.toJSON(), users: projectUsers } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUserProjects = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const projects = await db.projects.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: db.clients,
        },
        {
          model: db.projectTypes
        }
      ],
      attributes: {
        exclude: ['projectType', 'clientId']
      }
    });
    res.json({ data: projects });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}