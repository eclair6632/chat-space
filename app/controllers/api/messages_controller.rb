class Api::MessagesController < ApplicationController
  def index
  # group_idを取得
    group = Group.find(params[:group_id])
  # 最後のメッセージのidを取得
    last_message_id = params[:id].to_i
  # 現状のメッセージidが最新のメッセージidよりも大きなidを持つメッセージを取得
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end