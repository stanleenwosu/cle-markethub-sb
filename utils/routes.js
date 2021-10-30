import { lazy } from "react";

const routes = [
  {
    path: "overview",
    component: lazy(() => import("pages/Overview")),
    exact: true,
  },
  {
    path: "customers",
    component: lazy(() => import("pages/Customers")),
    exact: true,
  },
  {
    path: "customers/:id",
    component: lazy(() => import("pages/UserProfile")),
    exact: true,
  },
  {
    path: "claims",
    component: lazy(() => import("pages/Claims")),
    exact: true,
  },
  {
    path: "policies",
    component: lazy(() => import("pages/Policies")),
    exact: true,
  },
  {
    path: "points-history",
    component: lazy(() => import("pages/DrivingPoints")),
    exact: true,
  },
  {
    path: "ride-history",
    component: lazy(() => import("pages/Rides")),
    exact: true,
  },
  {
    path: "crash-notifications",
    component: lazy(() => import("pages/CrashNotifications")),
    exact: true,
  },
  // {
  //   path: "gift-providers",
  //   component: lazy(() => import("pages/GiftProviders")),
  //   exact: true,
  // },
  {
    path: "banks",
    component: lazy(() => import("pages/Banks")),
    exact: true,
  },
  {
    path: "vehicle-parts",
    component: lazy(() => import("pages/VehicleParts")),
    exact: true,
  },
  {
    path: "vehicle-makes",
    component: lazy(() => import("pages/VehicleMakes")),
    exact: true,
  },
  {
    path: "vehicle-models",
    component: lazy(() => import("pages/VehicleModels")),
    exact: true,
  },
  // {
  //   path: "accounts",
  //   component: lazy(() => import("pages/Accounts")),
  //   exact: true,
  // },
  {
    path: "products",
    component: lazy(() => import("pages/Products")),
    exact: true,
  },
  {
    path: "partners",
    component: lazy(() => import("pages/Partners")),
    exact: true,
  },
  {
    path: "admins",
    component: lazy(() => import("pages/Admins")),
    exact: true,
  },
  {
    path: "broadcasts",
    component: lazy(() => import("pages/Broadcasts")),
    exact: true,
  },
];

export default routes;
