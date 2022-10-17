// getHealth method to response 200OK
export const getHealth = (req, res) => {
    res.status(200).send({ message: "Application UP"
    })
};