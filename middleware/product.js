export default function(context) {
  if (context.app.store.state.product === null) {
    return context.redirect("/");
  }
}
