export default function(context) {
  console.log("middleware", context.app.store.state.product);
  if (context.app.store.state.product === null) {
    return context.redirect("/");
  }
}
