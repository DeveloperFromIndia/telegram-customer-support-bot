import userAccessCache from "@/utils/userAccessCache";

const subscribeMiddleware = async (ctx: any, next: () => Promise<void>) => {
    console.error("!!! implement subscribe middleware");
    return next();
};

export default subscribeMiddleware;