require_relative 'base_page'

class DynamicLoading < BasePage

  START_BUTTON = { css: '#start button' }
  FINISH_TEXT = { id: 'finish' }

  def load(example_number)
    visit 'http://the-internet.herokuapp.com/dynamic_loading/' + example_number
    click START_BUTTON
  end

  def finish_text_present?
    wait_for(10) { is_displayed? FINISH_TEXT }
  end

end
