import {mount, shallow} from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import ListDetail from "./ListDetail";

describe("List Component", () => {
    let wrapper, mountwrap;
    const cProps = {
        item: {
            headline: {
                main: "heading",
            },
            lead_paragraph: "para",
            byline: {
                original: 'naveed'
            },
            pub_date: '22-03-2019T00:23:34',
            multimedia: [{
                url: ''
            }]
        },
    };

    beforeEach(() => {
        wrapper = shallow(
            <ListDetail {...cProps} />
        );
    });

    it("List Component renders correctly", () => {
        expect(wrapper.children().length).not.toBeLessThan(1);
    });
});
