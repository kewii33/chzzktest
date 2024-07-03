import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { PiSignIn } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "@/utils/api/authAPI";

export default function SignInIconDropdown() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button>
            <PiSignIn />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="signIn">
            <div className="flex gap-2" onClick={googleLogin}>
              <div>
                <FcGoogle />
              </div>
              <div>구글 로그인</div>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
