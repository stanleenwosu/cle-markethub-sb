import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
import ProductRepository from '~/repositories/ProductRepository';

const { SubMenu } = Menu;

class PanelCategories extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { data: categories, ...rest } =
      await ProductRepository.getCategories();
    console.log('🚀 ~ PanelCategories ~ componentDidMount ~ rest', rest);
    this.setState({ categories });
  }

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
    categories: [],
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}>
        {this.state.categories.length === 0
          ? null
          : this.state.categories.map((category) => (
              <Menu.Item key={category.id}>
                <a href={`/category/${category.id}`}>{category.name}</a>
              </Menu.Item>
            ))}
      </Menu>
    );
  }
}

export default PanelCategories;
