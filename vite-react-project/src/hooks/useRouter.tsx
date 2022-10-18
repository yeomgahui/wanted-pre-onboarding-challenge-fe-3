const useRouter = () => {
    const push = (path:string) => {
        history.pushState({},'', path);
    };
    return {push};
};

export default useRouter;