//@ts-nocheck
import React, {Ref, createRef} from 'react';

import {
  CommonActions,
  NavigationContainerRefWithCurrent,
  StackActions,
} from '@react-navigation/native';

// export { Routes } from './Routes';

/**
 * Used in {@link Navigator} to keep track of navigation container mounts.
 */
export const isMountedRef = React.createRef();

/**
 * Used for navigation by NavigationService
 */
export const navigationRef =
  createRef<NavigationContainerRefWithCurrent<any>>(null);

const ERROR_NOT_INIT =
  'Navigation Service: attempting to navigate with an unintialized ref.';

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName: string, params: any = {}) {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted

    navigationRef.current?.navigate(routeName, params);
  } else {
    throw new Error(ERROR_NOT_INIT);
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName: string, params: any) {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(
      CommonActions.reset({
        routes: [{routeName, params}],
      }),
    );
  } else {
    throw new Error(ERROR_NOT_INIT);
  }
}

/**
 * Pop the current screen.
 */
function goBack() {
  if (navigationRef.current) {
    navigationRef.current?.goBack();
  } else {
    throw new Error(ERROR_NOT_INIT);
  }
}

/**
 * Replace the current screen.
 */
function replace(routeName: string, params: any = {}) {
  if (navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(routeName, params));
  } else {
    throw new Error(ERROR_NOT_INIT);
  }
}

function navigateWithoutRef(routeName: string, params: any) {
  navigationRef.current?.navigate(routeName, params);
}

/**
 * Custom navigation stack reset.
 * e.g.
 * navigationService.reset([
 *        { name: "Screen1" },
 *        { name: "Screen2" },
 *        { name: "Screen3" },
 *        { name: "Screen4" },
 *      ], 3)
 */
function reset(routeName: string, params: any) {
  try {
    if (navigationRef.current) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      });
      navigationRef.current.dispatch(resetAction);
      //
      //
      //
      // navigationRef.current.dispatch(
      //     CommonActions.reset({
      //         index,
      //         routes,
      //     })
      // );
    } else {
      throw new Error(ERROR_NOT_INIT);
    }
  } catch (error) {}
}

/**
 * Pop the desired number of screens.
 */
function pop(count: number) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.pop(count));
  } else {
    throw new Error(ERROR_NOT_INIT);
  }
}

function popToTop() {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    // navigationRef.current.popToTop();
    navigationRef.current.dispatch(StackActions.popToTop());
  } else {
    throw new Error(ERROR_NOT_INIT);
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

function toggleDrawer() {
  // navigator.dispatch(DrawerActions.toggleDrawer());
}

function openDrawer() {
  // navigator.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  // navigator.dispatch(DrawerActions.closeDrawer());
}

const NavigationService = {
  navigate,
  toggleDrawer,
  openDrawer,
  closeDrawer,
  navigateAndReset,
  goBack,
  replace,
  reset,
  pop,
  popToTop,
  navigateWithoutRef,
};

export default NavigationService;
