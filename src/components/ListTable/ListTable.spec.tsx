import {mount, shallow} from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import ListTable from "./ListTable";

describe("List Component", () => {
    let wrapper, mountwrap;
    const cProps = {
        articleList: [],
    };

    beforeEach(() => {
        wrapper = shallow(
            <BrowserRouter>
                <ListTable {...cProps} />
            </BrowserRouter>,
        );
    });

    it("List Component renders correctly", () => {
        expect(wrapper.children().length).not.toBeLessThan(1);
    });
});
