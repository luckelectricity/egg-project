import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./button";

test('测试button内的文字', async () => {
  await render(<Button>123</Button>);
  expect(screen.getByText('123')).toBeInTheDocument();
})
