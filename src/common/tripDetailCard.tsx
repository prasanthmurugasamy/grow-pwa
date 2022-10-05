import MessageTwoTone from "@ant-design/icons/lib/icons/MessageTwoTone";
import PhoneTwoTone from "@ant-design/icons/lib/icons/PhoneTwoTone";
import ShareAltOutlined from "@ant-design/icons/lib/icons/ShareAltOutlined";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import * as React from "react";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import CustomBadge from "./customBadge";

const TripDetailcard = () => {

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        Action name
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <>
    <SwipeableList>
    <SwipeableListItem
    leadingActions={leadingActions()}
    trailingActions={trailingActions()}
  >
 
      <div
        className=" rounded overflow-hidden shadow-sm border-gray-200 border-2"
        style={{ margin: 10 }}
      >
        <div style={{ margin: 10 }}>
          <Row className="justify-between flex">
            <p className="text-blue-600 font-bold text-base justify-self-start">
              #151099{" "}
              <span className="text-gray-400 font-normal text-sm">
                | 19 jul | Ravi Kumar | Biswajit N
              </span>
            </p>
            <Col>
              <p className="font-bold text-sm text-black ">₹32000</p>
            </Col>
          </Row>
          <Col>
            <Row
              className="flex"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomBadge
                size={6}
                color={"green"}
                label={"Coimbatore"}
                lableStyle={{ marginLeft: 3, fontSize: 14 }}
              />
              <ShareAltOutlined style={{ marginTop: 10 }} />
            </Row>
            <label className="text-gray-400 font-normal text-sm">
              Hindustan National Glass private Limited
            </label>
            <CustomBadge
              size={6}
              color={"red"}
              label={"Chennai"}
              lableStyle={{ marginLeft: 3, fontSize: 14 }}
            />
          </Col>
          <Col>
            <Row>
              <p className="text-gray-400 font-normal text-sm">
                LG Brothers Logistics
              </p>
            </Row>
            <Row className="flex justify-between items-center">
              <p className="text-gray-400 font-normal text-sm">Salem Raja</p>
              <p className="font-light text-sm">TN39CK3370 - MXL</p>
            </Row>
          </Col>
          <hr style={{ width: "100%", marginTop: 5 }}></hr>

          <Row
            className="flex justify-between items-center"
            style={{ marginTop: 7 }}
          >
            <p className="font-light text-xs">Waiting for LR...</p>
            <Row style={{ width: 80 }} className="justify-between flex">
              <MessageTwoTone />
              <PhoneTwoTone />
            </Row>
          </Row>
        </div>
      </div>
      </SwipeableListItem>
      </SwipeableList>
    </>
  );
};
export default TripDetailcard