const express = require("express");
const router = express.Router();
const {apiCallPost} = require('./helpers')

router.get("/", async (req, res) => {
    console.log("Get all users route used")

    const query = {
        query: `query RooterQueryType($input:QueryInput){
            nodes(itemInput:$input){
                id
                title
                relationships {
                    id
                    sourceId
                    sourceNode {
                        parentId
                        title
                    }
                 }
            }
        }`,
        variables: {
            input: {
                parentId: "co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c"
            }
        }
    }

    let response


    response = await apiCallPost(query, "/api/graphql")

    res.json(response.data.data.nodes)
})

router.post("/login", async (req, res) => {

    const [username, password] = [req.body.username, req.body.password]

    const query = {
        query: `query RooterQueryType($input1:QueryInput, $input2:QueryInput ,$input3:QueryInput){
            nodes(itemInput:$input1){
                id
                title
                relationships(relationshipInput:$input2){
                    id
                    sourceId
                    sourceNode(nodeInput:$input3){
                        title
                    }
                 }
            }
        }`,
        variables: {
            input1: {
                parentId: "co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c",
                title: username
            },
            input2: {
                parentId: "coir_2bddc743-714d-450e-ab5d-436b8b4b74e8-co_3919a4ae-4885-4cdd-8e60-42dd6467e007-co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c",
            },
            input3: {
                title: password
            }
        }
    }

    let response = await apiCallPost(query, "/api/graphql")

    let foundName = response.data.data.nodes[0].title
    let foundPassword = response.data.data.nodes[0].relationships[0]?.sourceNode?.title

    console.log("foundName: " + foundName)
    console.log("foundPassword: " + foundPassword)

    if(foundName === username && foundPassword === password) res.json({message: "success", user: username})
    else res.json({message: "error", user: null})
})


module.exports = router