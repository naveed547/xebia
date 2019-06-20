import * as React from "react";
import {mount, shallow} from "enzyme";

import Pagination from './Pagination'


describe('Pagination', () => {

  let wrapper, mountwrap;
  const cProps = {
    onChangePage: () => {},
    items: [
      1,2,3,4,5,6,7,8,9,10
    ]
};

  beforeEach(() => {
      wrapper = shallow(<Pagination  {...cProps} />);
      mountwrap = mount(<Pagination {...cProps} />);
  });

  describe('render correctly', () => {
    it('check if component renders correctly', () => {
      expect(wrapper.children().length).not.toBeLessThan(1);
    });
  });

  describe('check pages created correctly', () => {
    it('check if pages created correctly', () => {
      expect(wrapper.instance().state.pager.pages.length).toBe(2);
    });
  });

  describe('check setPage method', () => {
    it('check if sePage sets the page correctly', () => {
      wrapper.instance().setPage(2);
      expect(wrapper.instance().state.pager.currentPage).toBe(2);
    });
  })


})