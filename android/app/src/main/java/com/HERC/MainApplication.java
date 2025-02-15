package com.HERC;

import com.entria.views.RNViewOverflowPackage;
import android.app.Application;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import com.swmansion.rnscreens.RNScreensPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.airbitz.AbcCoreJsUi.AbcCoreJsUiPackage;
import com.peel.react.TcpSocketsModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.rnfs.RNFSPackage;
import co.airbitz.fastcrypto.RNFastCryptoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(

            new MainReactPackage(),
            new RNDeviceInfo(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new TcpSocketsModule(),
            new RandomBytesPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new ReactNativeDocumentPicker(),
            new RNCameraPackage(),
            new AbcCoreJsUiPackage(),
            new AsyncStoragePackage(),
            new RNScreensPackage(),
            new LinearGradientPackage(),
            new RNFastCryptoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
