const prisma = require('./client')
const exclude = require("./../utils/exclude")
/**
 * The goal of this request is to provide the information of a user in readonly, if and only if the user authorized and published its resume
 *
 */

module.exports = {
    getResume: async (req, res) => {
        try {
            const {username} = req.params

            //We had a concern on whether we should use the username or the id to retrieve the data.
            //However, the id is already a field of the resume, so using the username would be suboptimal
            const resume = await prisma.user.findUnique({
                where: {
                    username: username
                },
                //Include all the fields
                select: {
                    firstName: true,
                    lastName: true,
                    resume: {
                        include: {
                            skills: true,
                            experiences: true,
                            formations: true,
                            languages: true,
                            hobbies: true,
                            contacts: true,
                            Image: true
                        }
                    }
                }

            })
            //In this part we do not want certain fields like the id and the visibility
            //const filteredResume = exclude.exclude(resume, ["published"])['0']


            console.log("Resume fetched")
            if (resume === null) {
                return res.status(404).json({message: "No resume found."})
            }
            return res.status(200).json(resume)

        } catch (e) {
            console.error(e)
            console.log("Error : resume can not be fetched")
            return res.status(500).json({message: "Error : resume can not be fetched"})
        }
    },

    getPortfolio: async (req, res) => {
        try {
            const {username} = req.params

            const userProjects = await prisma.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    projects: {
                        where: {
                            visible: true
                        },
                        include: {
                            MainImage: true,
                            skills: true
                        }
                    }
                }
            })

            console.log("Projects fetched: ", userProjects)
            return res.status(200).json(userProjects.projects)
        } catch (e) {
            console.error("Could not fetch projects: ", e)
            return res.status(500).json({message: "Error : projects can not be fetched"})
        }
    },

    getProject: async (req, res) => {
        try {
            const {username, projectId} = req.params

            const project = await prisma.project.findUnique({
                where: {
                    id: projectId,
                    User: {
                        username: username
                    }
                },
                include: {
                    components: {
                        orderBy: {
                            index: "asc"
                        }
                    },
                    skills: true,
                    MainImage: true,
                    ProjectImages: true
                }
            })

            return res.status(200).json(project)

        } catch (e) {
            console.error("Could not fetch project: ", e)
            return res.status(500).json({message: "Error: could not fetch project"})
        }
    }
}