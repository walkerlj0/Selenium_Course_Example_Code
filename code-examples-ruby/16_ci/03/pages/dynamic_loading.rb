require_relative 'base_page'

class DynamicLoading < BasePage

  START_BUTTON = { css: '#start button' }
  FINISH_TEXT = { id: 'finish' }

  def example(example_number)
    visit "/dynamic_loading/#{example_number}"
  end

  def start
    click START_BUTTON
  end

  def finish_text?
    wait_for(10) { is_displayed? FINISH_TEXT }
  end

end
