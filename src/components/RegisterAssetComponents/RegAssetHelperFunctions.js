export const showCamSourceModal = () => {
    console.log(this.state.showCamSourceModal, "I'm from somewhere else! showCamSourceModal");
    this.setState({
        showCamSourceModal: !this.state.showCamSourceModal
    })
    // console.log(this.state.showCamSourceModal, "showmodal1after");
}