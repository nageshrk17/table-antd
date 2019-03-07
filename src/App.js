import React, { Component } from 'react';
import './App.css';
import { Table } from 'antd';
import 'antd/dist/antd.css';
const { Column } = Table;


const dataSource = [{
  key: 0,
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: 1,
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
    };
  }

  showButton(rowIndex) {
    this.setState({ selected: rowIndex });
  }

  hideButton(rowIndex) {
    this.setState({ selected: null });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="App">
        <Table 
          dataSource={dataSource}
          pagination={{ pageSize: 5 }} 
          onRow={(record, rowIndex) => {
            return {
              onMouseEnter: (event) => {this.showButton(rowIndex)},
              onMouseLeave: (event) => {this.hideButton()},
            };
          }}
        > 
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
          />
          <Column
            title="Age"
            dataIndex="age"
            key="age"
          />
          <Column
            title="Address"
            dataIndex="address"
            key="address"
           />
          <Column
            title="Action"
            dataIndex="Action"
            key="action"
            render={(text, record, index) => (
              <span>
              { selected === index ? <span>Button</span> : '' }
              </span>
            )}
           />
       </Table>
      </div>
    );
  }
}

export default App;
