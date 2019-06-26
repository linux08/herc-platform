import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import OnboardingWithCTA from "../screens/MainApp/Onboarding";

const OnboardingNavigator = createStackNavigator(
    {
        OnboardingNavigator: {
            screen: OnboardingWithCTA,
        },
    },
    {
        initialRouteName: 'OnboardingWithCTA',
        headerMode: 'none',
    }
)

export default OnboardingNavigator;
