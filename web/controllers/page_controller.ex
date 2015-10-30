defmodule Gametemplate.PageController do
  use Gametemplate.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
