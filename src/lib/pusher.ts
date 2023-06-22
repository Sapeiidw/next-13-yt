import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1594539",
  key: "ba9e510c464e080d049f",
  secret: "67b5ba45962e6ae7ac9f",
  cluster: "ap1",
  useTLS: true,
});

export const pusherClient = new PusherClient("ba9e510c464e080d049f", {
  cluster: "ap1",
  ignoreNullOrigin: true,
});
