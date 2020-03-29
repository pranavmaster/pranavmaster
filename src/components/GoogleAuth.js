import React from "react";

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };

	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"24563262763-3riqp1rncb6dsj9fljldov4f0net8fgi.apps.googleusercontent.com",
					scope: "email"
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    this.auth.isSignedIn.listen(this.onAuthChange)
				});
		});
    }
    
    onAuthChange=()=>{
        this.setState({isSignedIn:this.auth.isSignedIn.get()});
    };

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return <div>i dont know if we are signed in</div>;
		} else if (this.state.isSignedIn) {
			return <div>I am signed in</div>;
		} else {
			return <div>I am not signed in</div>;
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

export default GoogleAuth;
