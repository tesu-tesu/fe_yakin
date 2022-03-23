import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                <Component {...props} />} />

    )
}

export const PublicRoute = ({
    component: Component,
    restricted,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                <Component {...props} />} />

    )
}