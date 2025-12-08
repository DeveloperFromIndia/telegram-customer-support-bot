import CallModel from "./Call";
import TarifModel from "./Tarifs";
import SubscriptionModel from "./Subscription";
import UserModel from "./User";

function setupModels() {

    return {
        UserModel,
        CallModel,
        SubscriptionModel,
        TarifModel
    }
}

export default setupModels;