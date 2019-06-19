import {mount, shallow} from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import ListDetail from "./ListDetail";

describe("List Component", () => {
    let wrapper, mountwrap;
    const cProps = {
        item: [],
    };

    beforeEach(() => {
        wrapper = shallow(
            <BrowserRouter>
                <ListDetail {...cProps} />
            </BrowserRouter>,
        );
    });

    it("List Component renders correctly", () => {
        expect(wrapper.children().length).not.toBeLessThan(1);
    });
});
