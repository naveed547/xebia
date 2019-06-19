import {mount, shallow} from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { Loader } from "./Loader";

describe("Loader Component", () => {
    let wrapper, mountwrap;
    beforeEach(() => {
        wrapper = shallow(<Loader />);
        mountwrap = mount(<Loader />);
    });

    it("Loader Component renders correctly", () => {
        expect(wrapper.children().length).not.toBeLessThan(1);
    });

    it("Loader Component renders correctly using snapshots", () => {
        const rendered = renderer.create(
            <Loader />,
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});
