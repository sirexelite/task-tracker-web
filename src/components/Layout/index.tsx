import './index.scss';
import type {PropsWithChildren} from "react";
import classNames from "classnames";
import Sidebar from "@components/Sidebar";

type LayoutType = {

}
const Layout = (props: LayoutType & PropsWithChildren) => {
    return <div className={classNames('component-layout')}>
        <Sidebar/>
        <div className={'layout-content'}>
            {props.children}
        </div>
    </div>;
}

export default Layout;