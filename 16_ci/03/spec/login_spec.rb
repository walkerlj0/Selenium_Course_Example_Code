require_relative 'spec_helper'
require_relative '../pages/login'

describe 'Login', depth: 'shallow' do

  before(:each) do
    @login = Login.new(@driver)
  end

  it 'succeeded' do
    @login.with('tomsmith', 'SuperSecretPassword!')
    @login.success_message?.should be_displayed
  end

  it 'failed' do
    @login.with('asdf', 'asdf')
    @login.failure_message?.should be_displayed
  end

  it 'forced failure' do
    @login.with('asdf', 'asdf')
    @login.failure_message?.should_not be_displayed
  end

end
