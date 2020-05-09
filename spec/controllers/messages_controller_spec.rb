require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'ログインしている場合' do
      before do
      # loginメソッドはcontroller_macro.rbで定義されている。
        login user
      #messagesのルーティングはgroupsにネストされているため、group_idを含んだパスを生成する。
      # そのため、getメソッドの引数として、params: { group_id: group.id }を渡している。
        get :index, params: { group_id: group.id }
      end

      it '@messageに期待した値が入っていること' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it '@groupに期待した値が入っていること' do
        expect(assigns(:group)).to eq group
      end

      it 'index.html.erb に遷移すること' do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない場合' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'ログイン画面にリダイレクトすること' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let (:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしている場合' do
      before do
        login user
      end

      context 'メッセージの保存に成功した場合' do
        subject {
          post :create,
          params: params
        }
        
        it 'メッセージを保存すること' do
        expect{ subject }.to change(Message, :count).by(1)
        end
        
        it 'メッセージ保存後、group_messages_pathへリダイレクトすること' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'メッセージの保存に失敗した場合' do
        let(:invaild_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
      
        subject {
          post :create,
          params: invaild_params
        }

        it 'メッセージの保存に失敗した場合、メッセージを保存しないこと' do
        # 「〜であること」を期待する場合にはto
        # 「〜でないこと」を期待する場合にはnot_to
          expect{ subject }.not_to change(Message, :count)
        end

        it 'メッセージの保存に失敗した場合、index.html.hamlに遷移すること' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない場合' do
      it 'new_user_session_pathにリダイレクトすること' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end