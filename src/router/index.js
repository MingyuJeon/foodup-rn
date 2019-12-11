import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, StackViewTransitionConfigs} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CustomerServiceScreen from '../screens/CustomerServiceScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import StoreScreen from '../screens/StoreScreen';
import ImageGalleryScreen from '../screens/ImageGalleryScreen';
import Test from '../screens/test'
const IOS_MODAL_ROUTES = ['OptionsScreen'];

let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
    const isModal = IOS_MODAL_ROUTES.some(
        screenName =>
            screenName === transitionProps.scene.route.routeName ||
            (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    )

    // const test = {
    //     transitionSpec: {
    //         duration: 0,
    //     },
    // }
    return StackViewTransitionConfigs.defaultTransitionConfig(
        transitionProps,
        prevTransitionProps,
        isModal,
        // test
    );
};

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Favorite: {
        screen: FavoriteScreen
    },
    Search: {
        screen: SearchScreen
    },
    Category: {
        screen: CategoryScreen
    },
    Store: {
        screen: StoreScreen
    },
    CustomerService: {
        screen: CustomerServiceScreen
    },
    ImageGallery: {
        screen: ImageGalleryScreen
    },
    Test: {
        screen: Test
    }
},{
    initialRouteName: 'Home',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    /*transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
        },
    }),*/
    transitionConfig: dynamicModalTransition
});

const App = createAppContainer(AppNavigator)

export default App;
