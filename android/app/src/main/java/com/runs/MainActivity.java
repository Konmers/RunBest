package com.runs;

import com.facebook.react.ReactActivity;

// 1. 添加以下两行：
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
    // 2. 添加如下一行：
  private PermissionListener listener; // <- add this attribute

  @Override
  protected String getMainComponentName() {
    return "runs";
  }
}
