import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import { connect } from "react-redux";
import Home from "./Home"
import Splash from './splash'
import Timeline from './Timeline';
import Inputs from './inputs';

class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
				   <Scene key="Home" component={Home}  hideNavBar/>
				   <Scene key="Splash" component={Splash} hideNavBar initial={true} />
				   <Scene key="Timeline" component={Timeline} hideNavBar />
				   <Scene key="Inputs" component={Inputs} hideNavBar />
			    </Stack>
			 </Router>
			)
	}
}

export default connect()(Routes)