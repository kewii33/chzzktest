import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { BiSolidLike } from "react-icons/bi";
import { ImBlocked } from "react-icons/im";

export default function MyPageTabs() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs">
        <Tab
          key="photos"
          title={
            <div className="flex gap-4">
              <BiSolidLike />
              <span>좋아요한 동영상</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex gap-4">
              <ImBlocked />
              <span>차단한 채널</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
