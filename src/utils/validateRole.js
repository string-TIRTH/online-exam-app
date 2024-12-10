
import decryptData from "../utils/cryptoHelper";

const validRoles = ["Admin","Examiner","Student"]
const validateRole = (role) => {
    role = decryptData(role);
    if(validRoles.includes(role))
        return role;
    return false;
};
export default validateRole