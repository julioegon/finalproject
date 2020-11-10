import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";
import Profile from "./profile";

test("when no url is passed, /logo.png is used as src", () => {
    const { container } = render(<ProfilePic />);
    console.log(
        'container.querySelector("img"):',
        container.querySelector(img.src)
    );

    expect(container.querySelector("img").src.endWith("logo.png")).toBe(true);
});

test("When the url is passed as a prop, that url is used in the src of the img", () => {
    const { container } = render(<ProfilePic first={"Julio"} url={""} />);

    expect(container.querySelector("img").src).toBe("");
});

test("onClick prop runs when the img is clicked", () => {
    const onClick = jest.fn(() => console.log("Clicked!!"));
    const { container } = render(<ProfilePic onclick={onClick} />);
    console.log("onClick.mock", onClick.mock);

    fireEvent.click(container.querySelector("img"));

    console.log("onClick.mock", onClick.mock);
    expect(onClick.mock.calls.length).toBe(1);
});
