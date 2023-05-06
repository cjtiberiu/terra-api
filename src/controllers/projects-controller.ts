import { Request, Response } from 'express';
const db = require('../models/');

// export const getProjects = async (req: Request, res: Response) => {
//   //if (req.user.userType == 'user') return res.sendStatus(401);
//   try {
//     const clients = await db.clients.findAll({
//       include: [
//         {
//           model: db.countries,
//           attributes: ['name', 'code', 'currency'],
//         },
//       ],
//       attributes: {
//         exclude: ['countryId'],
//       },
//     });
//     res.json({ clients: clients });
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// };

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await db.projects.findAll({
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