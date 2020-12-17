class ListReflex < StimulusReflex::Reflex
  def create_task
    list = List.find(element.dataset.list_id)
    @task = list.tasks.create(task_params.merge(creator: connection.current_user))
    @task = Task.new if @task.persisted?
  end

  private

  def task_params
    params.require(:task).permit(:name)
  end
end
