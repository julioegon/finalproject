import React from "react";
import App from "./app";

import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

axios.get.mockResolvedValue({
    data: {
        first: "Julio",
        last: "Gonzalez",
        url: "",
        id: "1",
        bio: "",
    },
});

test("app eventually shows a div", async () => {
    const { container } = render(<App />);
    console.log("container.innerHTML: ", container.innerHTML);

    expect(container.innerHTML).toBe("");

    await waitForElement(() => container.querySelector("div"));

    console.log("container.innerHTML", container.innerHTML);

    expect(container.querySelector("div").children.length).toBe(1);
});
