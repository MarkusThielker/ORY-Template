import {Configuration, V0alpha2Api} from "@ory/client";

const oryConfiguration = new Configuration({
    basePath: "/kratos",
    baseOptions: {
        withCredentials: true
    }
})

const ory = new V0alpha2Api(oryConfiguration)

export default ory
