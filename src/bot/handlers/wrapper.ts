const HandlersWrapper = (handlers: any, bot: any) => {
    handlers.forEach((handler: any) => {
        handler(bot);
    });
}

export default HandlersWrapper;