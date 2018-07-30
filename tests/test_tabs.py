from os import path
dir_path = path.dirname(path.realpath(__file__))

TABS_DIR = path.join(
    path.split(dir_path)[0],
    'tabs'
)

TABS_FILE = path.join(TABS_DIR, 'tabs.html').replace('\\', '/')
NESTED_TABS_FILE = path.join(TABS_DIR, 'nested-tabs.html').replace('\\', '/')

import pytest
from selenium import webdriver

@pytest.fixture(params=[webdriver.Chrome, webdriver.Firefox])
def load_tabs(request):
    driver = request.param()
    driver.get("file://" + TABS_FILE)
    return driver
    
def test_change_tab(load_tabs):
    ''' Test that switching tabs works properly '''
    driver = load_tabs
    driver.find_element_by_css_selector("#tabs-menu a:nth-child(2)").click()
    
    # Assert non-active tabs are hidden
    for i in [1, 3]:
        assert(driver.find_element_by_css_selector(
            "#tabs section:nth-child({})".format(i)
        ).get_attribute("style") == "display: none;")
    
    assert(driver.find_element_by_css_selector(
        "#tabs section:nth-child(2)").get_attribute("style") == "")
        
@pytest.fixture
def load_nested_tabs():
    driver = webdriver.Chrome()
    driver.get("file://" + NESTED_TABS_FILE)
    return driver
    
def test_change_nested_tab(load_nested_tabs):
    ''' Test that nested tabs work properly '''
    driver = load_nested_tabs
    
    # Click on third tab
    driver.find_element_by_css_selector("#tabs-menu a:nth-child(3)").click()
    
    # Go back to first
    driver.find_element_by_css_selector("#tabs-menu a:nth-child(1)").click()
    
    # Click on 2nd nested tab
    driver.find_element_by_css_selector("#inner-tabs-menu a:nth-child(2)").click()
    assert(driver.find_element_by_css_selector(
        "section[data-title*='B']").get_attribute("style") == "")