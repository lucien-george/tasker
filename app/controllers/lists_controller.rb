class ListsController < ApplicationController
  def index
    @lists = List.all
    @task ||= Task.new
  end
end
