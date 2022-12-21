const express = require("express");
const router = express.Router();
const {apiCallPost} = require('./helpers')

router.post("/", async (req, res) => {
    console.log("Get related checklists route used")

    const username = req.body.username

    const query = {
        query: `query RooterQueryType($input1:QueryInput, $input2:QueryInput ,$input3:QueryInput){
            nodes(itemInput:$input1){
                title
                relationships(relationshipInput:$input2) {
                    title
                    sourceNode {
                        title
                        relationships(relationshipInput:$input3) {
                            sourceNode {
                                title
                            }
                        }
                    }
                 }
            }
        }`,
        variables: {
            input1: {
                title: username
            },
            input2: {
                parentId: "coer_fd76733b-d347-4752-9bf2-d54cb05eacc0-co_cb04ef5f-27ae-43c7-a6de-29c5f8ee98e5-co_19c2f22d-a0c3-472d-84ef-f84ecb631d6c"
            },
            input3: {
                parentId: "coir_298041f2-772e-4b3d-9e1a-999f79c5043a-co_6f2e1040-b238-4014-a1ac-e1c49fa8bdb1-co_cb04ef5f-27ae-43c7-a6de-29c5f8ee98e5"
            }
        }
    }

    let response = await apiCallPost(query, "/api/graphql")

    res.json(response.data.data.nodes[0].relationships?.map(rel => rel.sourceNode))
})

module.exports = router;