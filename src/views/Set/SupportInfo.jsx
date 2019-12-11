import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";

import { Table, Button, Form, Input } from "antd";
import { setSupportInfoCols, operation } from "utils/cols";
import { HomeState } from "utils/extends";
import { getSetSupportInfo as getList } from "store/async";
@connect(
  state => ({
    ...state.set.supportInfo
  }),
  {
    getList
  }
)
class ManageScore extends HomeState {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(this.props);
    this.state.loading = true;
    this.state.graduate_explain_id = this.props.location.state.key;
    this.tableCols = [
      ...setSupportInfoCols,
      operation({
        render: (txt, record) => (
          <div>
            <Button icon="edit"></Button>
            <Button icon="delete" className="ml20"></Button>
          </div>
        )
      })
    ];
  }

  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.6;
    this.setState({
      scroll: {
        x: dom.clientWidth - 40,
        y: ycal
      }
    });
    this.getList();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    });
  }
  getList = params => {
    const { page, page_size } = this.props.page;
    this.setState({
      loading: true
    });

    this.props.getList({
      page,
      page_size,
      ...params,
      graduate_explain_id: this.state.graduate_explain_id
    });
  };
  render() {
    const { state } = this.props.location;
    const { scroll, loading } = this.state;
    const { lists } = this.props;

    return (
      <div ref="need" className="secondDiv animated slideInRight">
        <ContentTitle
          title={(state && state.title) || ""}
          txt={<div style={{ fontSize: 20 }}>{state.h3}</div>}
          btn={
            <div>
              <Button type="primary" className="ml20">
                新增
              </Button>
            </div>
          }
        />
        <StaticForm {...state} />
        <Table
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
          }}
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={this.tableCols}
        ></Table>
      </div>
    );
  }
}

class WrappForm extends React.Component {
  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelAlign: "left",
      colon: false
    };
    const { enter_year, major, content, support } = this.props;
    return (
      <Form
        {...formItemLayout}
        style={{ width: "50%", maxWidth: 400, fontSize: 20, paddingLeft: 40 }}
      >
        <Form.Item label="入学年份">
          {getFieldDecorator("enter_year", {
            initialValue: enter_year
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="专业">
          {getFieldDecorator("major", {
            initialValue: major
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="毕业要求">
          {getFieldDecorator("content", {
            initialValue: content
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="支撑点">
          {getFieldDecorator("support", {
            initialValue: support
          })(<Input disabled />)}
        </Form.Item>
      </Form>
    );
  }
}
const StaticForm = Form.create({ name: "register" })(WrappForm);

export default ManageScore;
