class GroupsController < ApplicationController
  def index
  end
  
  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループ名を更新しました。'
    else
      render :edit
    end
  end

  private
  def group_params
  # 配列に対して保存を許可する場合は、キーの名称とバリューに「[]」と記述
  # グループモデルのユーザー名、所属する複数のユーザーIDのみ受け取る。
    params.require(:group).permit(:name, user_ids: [])
  end

  end
