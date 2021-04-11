import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "antd";
import styled from "@emotion/styled";

import {
  StarOutlined,
  StarFilled,
  StarTwoTone,
  BoldOutlined,
  UnderlineOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { runInThisContext } from "node:vm";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

type Props = {
  children?: ReactNode;
  title?: string;
};

class ButtonState {
  pressed: boolean;

  constructor() {
    this.pressed = false;
    makeObservable(this, {
      pressed: observable,
      onTogglePressed: action.bound,
    });
  }

  onTogglePressed() {
    this.pressed = !this.pressed;

    if (this.pressed) {
      // Prosemirror code to make selection bold
    } else {
      // Prosemirror code to make selection normal
    }
  }
}

const buttonState = new ButtonState();

interface StyledButtonProps {
  fontWeight?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: ${(props) => props.fontWeight};

  &:hover {
    color: white;
  }

  .anticon {
    background-color: red;
  }
`;
const Layout = observer(({ children, title = "This is the default title" }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Button icon={<BoldOutlined />}></Button>
        <StyledButton
          icon={<DeleteOutlined />}
          fontWeight={buttonState.pressed ? "bold" : "normal"}
          onClick={buttonState.onTogglePressed}
        >
          Delete
        </StyledButton>
        {/* <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav> */}
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
});

export default Layout;
