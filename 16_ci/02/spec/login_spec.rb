require_relative 'spec_helper'
require_relative '../pages/login'

describe 'Login', depth: 'shallow' do

  before(:each) do
    @login = Login.new(@driver)
  end

  it 'succeeded' do
    @login.with('tomsmith', 'SuperSecretPassword!')
    @login.success_message_present?.should be_true
  end

  it 'failed' do
    @login.with('asdf', 'asdf')
    @login.failure_message_present?.should be_true
  end

end
