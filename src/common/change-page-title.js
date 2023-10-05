import React, { useEffect } from "react";

const ChangePageTitle = ({ pageTitle }) => {

    useEffect(() => {
        const prevTitle = document.title;
        document.title = "Moulting citizen science - " + pageTitle;
        return () => {
            document.title = prevTitle;
        };
    });

    return <></>;
};

export default ChangePageTitle;