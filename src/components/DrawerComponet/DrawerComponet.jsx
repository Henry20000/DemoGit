import { Drawer } from "antd";
import React from "react";

const DrawerComponet = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
    return (
        <>
            <Drawer title={title} placemen={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
      </>
    )
}

export default DrawerComponet